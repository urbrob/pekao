import csv,os
import sys

from django.contrib.gis.geos import Point
from django.core.management.base import BaseCommand, CommandError
from stats.models import Employer, Payment, Terminal
from users.models import User

import datetime as dt
import requests, json
import random, string


class Command(BaseCommand):
	help='CZEGO '

	def makeEmail(self):
		extensions = ['com', 'net', 'org', 'gov']
		domains = ['gmail', 'yahoo', 'comcast', 'verizon', 'charter', 'hotmail', 'outlook', 'frontier']

		winext = extensions[random.randint(0, len(extensions) - 1)]
		windom = domains[random.randint(0, len(domains) - 1)]

		acclen = random.randint(1, 20)

		winacc = ''.join(random.choice(string.ascii_lowercase + string.digits) for _ in range(acclen))

		finale = winacc + "@" + windom + "." + winext

		return str(finale)

	def get_address(self,code):
		#from Kody Pocztowe get CorZipCode adress
		with open('KODY_POCZTOWE.csv', 'rt', encoding="utf-8") as csvfile:
			reader = csv.DictReader(csvfile)
			for row in reader:
				if str(row['KOD_POCZTOWY']) == code:
					return str(row['ADRES']+" "+str(row['MIEJSCOWOSC']))
			return None




	def get_lat_loc(self, address):
		url = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json"
		print(address)
		querystring = {"input": address, "inputtype": "textquery", "fields": "geometry",
					   "key": "AIzaSyBhnPYIFd00vbVYpH1L7AFKW04kbS7asZo"}


		response = requests.request("POST", url, params=querystring,timeout=5)

		json_resp = json.loads(response.text)
		if json_resp["status"] == "ZERO_RESULTS":
			return None

		return Point(x=json_resp['candidates'][0]['geometry']['location']['lat'],y=json_resp['candidates'][0]['geometry']['location']['lng'])


	def handle(self, *args, **options):
		# this part creates Users and related Employer objects,
		# do not delete users but create a dummy location 0.0 !!!! - not implemented
		counter = 0
		max_entries = 200
		with open('Employer_merchant.csv', 'rt', encoding="utf-8") as csvfile:
			reader = csv.DictReader(csvfile)


			for row in reader:
				if counter == max_entries:
					sys.exit()
				email = self.makeEmail()
				print(email)
				user = User(username=email, first_name="Jan", last_name="Kowalski", email=self.makeEmail(),
							password="qweasdzxc123")
				user.save()

				address = self.get_address(str(row['CorZipCode']))
				if address is None:
					user.delete()
				else:
					coords = self.get_lat_loc(address=address)
					if coords is None:
						user.delete()
					else:
						employer = Employer(eid=str(row['anon_Eid']), name=str(row['anon_Name']),
											created_at=dt.datetime.strptime(str(row['CreatedDate']),
																			'%Y-%m-%dT%H:%M:%S.%fZ '),
											modified_at=dt.datetime.strptime(str(row['ModifiedDate']),
																			 '%Y-%m-%dT%H:%M:%S.%fZ '),
											location=str(row['CorZipCode']),
											lat=coords.x, lon=coords.y, branch_of_business=str(row['MCC']),
											owner=user)

						employer.save()

		# part 1 done

		"""terminal test

		# with open('Terminal.csv', 'rt', encoding="utf-8") as csvfile:
		# 	reader = csv.DictReader(csvfile)
		# 	for row in reader:
		# 		print(str(row['anon_Eid']))
		# 		print(dt.datetime.strptime(str(row['CreatedDate']),'%Y-%m-%dT%H:%M:%S.%fZ '))
		# 		print(dt.datetime.strptime(str(row['ModifiedDate']),'%Y-%m-%dT%H:%M:%S.%fZ '))
		#

		"""

		# now create a Terminal objects

		with open('Terminal.csv', 'rt', encoding="utf-8") as csvfile:
			reader = csv.DictReader(csvfile)
			for row in reader:
				try:
					employer = Employer.objects.get(eid=str(row['anon_Eid']))
					# a = dt.datetime.strptime(str(row['CreatedDate']),'%Y-%m-%dT%H:%M:%S.%fZ ')
					# b = dt.datetime.strptime(str(row['ModifiedDate']),'%Y-%m-%dT%H:%M:%S.%fZ ')
					terminal = Terminal(eid=employer.eid,employer=employer,
										created_at=dt.datetime.strptime(str(row['CreatedDate']),'%Y-%m-%dT%H:%M:%S.%fZ '),
										modified_at=dt.datetime.strptime(str(row['ModifiedDate']),'%Y-%m-%dT%H:%M:%S.%fZ '))
					terminal.save()
				except Employer.DoesNotExist:
					print("ERROR, EMPLOYER WITH THIS anon_EID - NOT FOUND")
					print(row)

		# part 2 done

		""" transaction test

		# with open('TPD.csv', 'rt', encoding="utf-8") as csvfile:
		# 	reader = csv.DictReader(csvfile)
		#
		# 	for row in reader:
		# 		region = str(row['Region'])
		# 		country = str(row['Country'])
		# 		if region.__contains__("null"):
		# 			region = "No region"
		#
		# 		if country.__contains__("null"):
		# 			country = "No country"
		#
		# 		# na tym działało 2fdca20962edd3f7fcce07fcad1774b0
		#
		# 		try:
		# 			# merchant = Employer.objects.get(eid=str(row['anon_POS_ID']))
		# 			# terminal = Terminal.objects.get(eid=str(row['anon_POS_ID']))
		#
		# 			try:
		# 				print("---------")
		# 				time = dt.datetime.strptime(str(row['TxnData']) + str(row['TxnCzas']), '%Y%m%d%H%M%S')
		# 				print(row['anon_POS_ID'])
		# 				print(float(row['anon_Kwota']))
		# 				print(str(row['anon_NrKarty']),time)
		# 				print("---------")
		#
		# 			except:
		# 				print("---------")
		# 				time = dt.datetime(2018, 8, 1)
		# 				print(row['anon_POS_ID'])
		# 				print(float(row['anon_Kwota']))
		# 				print(str(row['anon_NrKarty']), time)
		# 				print("---------")
		#
		# 		except Employer.DoesNotExist:
		# 			print("This employer does not exist ")
		#
		# 		except Terminal.DoesNotExist:
		# 			print("This terminal does not exist ")
		#
		# 		except:
		# 			print("ERROR creating Payment record")

		"""


		# now create Transactions objects

		# with open('TPD.csv', 'rt', encoding="utf-8") as csvfile:
		# 	reader = csv.DictReader(csvfile)
		#
		# 	for row in reader:
		# 		region = str(row['Region'])
		# 		country = str(row['Country'])
		# 		if region.__contains__("null"):
		# 			region = "No region"
		#
		# 		if country.__contains__("null"):
		# 			country = "No country"
		#
		# 		# na tym działało 2fdca20962edd3f7fcce07fcad1774b0
		#
		# 		try:
		# 			# merchant = Employer.objects.get(eid=str(row['anon_POS_ID']))
		# 			# terminal = Terminal.objects.get(eid=str(row['anon_POS_ID']))
		#
		# 			print(float(row['anon_Kwota']), str(row['anon_NrKarty']), region, country, merchant.location,
		# 				  merchant.lat, merchant.lon, terminal)
		#
		# 			try:
		# 				time = dt.datetime.strptime(str(row['TxnData']) + str(row['TxnCzas']), '%Y%m%d%H%M%S')
		# 				payment = Payment(value=float(row['anon_Kwota']), card_number=str(row['anon_NrKarty']),
		# 								  region=region, country=country, location=merchant.location, lat=merchant.lat,
		# 								  lon=merchant.lon, terminal=terminal,
		# 								  created_at=time,
		# 								  modified_at=time)
		# 				payment.save()
		# 			except:
		# 				time = dt.datetime(2018, 8, 1)
		# 				payment = Payment(value=float(row['anon_Kwota']), card_number=str(row['anon_NrKarty']),
		# 								  region=region, country=country, location=merchant.location, lat=merchant.lat,
		# 								  lon=merchant.lon, terminal=terminal,
		# 								  created_at=time,
		# 								  modified_at=time)
		# 				payment.save()
		#
		#
		#
		# 		except Employer.DoesNotExist:
		# 			print("This employer does not exist ")
		# 			print(row)
		#
		# 		except Terminal.DoesNotExist:
		# 			print("This terminal does not exist ")
		# 			print(row)
		#
		# 		except:
		# 			print("ERROR creating Payment record")
		# 			print(row)