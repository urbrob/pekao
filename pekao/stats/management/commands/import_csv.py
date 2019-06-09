import csv,os
import sys

from django.contrib.gis.geos import Point
from django.core.management.base import BaseCommand, CommandError
from stats.models import Employer, Payment, Terminal
from users.models import User
import re

import datetime as dt
import requests, json
import random, string
import random
import time


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
		max_entries = 3

		with open('Employer_merchant.csv', 'rt', encoding="utf-8") as csvfile:
			reader = csv.DictReader(csvfile)

			for row in reader:

				if counter < max_entries:

					email = self.makeEmail()
					print(email)
					try:
						user = User(username=email, first_name="Jan", last_name="Kowalski", email=self.makeEmail(),
									password="qweasdzxc123")
						user.save()
						address = str(row['CorZipCode'])
						if address is None:
							user.delete()
						else:
							coords = Point(x=0.0, y=0.0)
							if coords is None:
								user.delete()
							else:
								employer = Employer(eid=re.sub("\s\s+" , " ", str(row['anon_Eid'])), name=str(row['anon_Name']),
													created_at=dt.datetime.strptime(str(row['CreatedDate']),
																					'%Y-%m-%dT%H:%M:%S.%fZ '),
													modified_at=dt.datetime.strptime(str(row['ModifiedDate']),
																					 '%Y-%m-%dT%H:%M:%S.%fZ '),
													location=str(row['CorZipCode']),
													lat=coords.x, lon=coords.y, branch_of_business=str(row['MCC']),
													owner=user)

								employer.save()
								counter += 1
					except:
						print("user exists")

				# else:
				# 	counter += 1
				# 	email = self.makeEmail()
				# 	print(email)
				# 	try:
				# 		user = User(username=email, first_name="Jan", last_name="Kowalski", email=self.makeEmail(),
				# 					password="qweasdzxc123")
				# 		user.save()
				#
				# 		address = self.get_address(str(row['CorZipCode']))
				# 		if address is None:
				# 			user.delete()
				# 		else:
				# 			coords = self.get_lat_loc(address=address)
				# 			if coords is None:
				# 				user.delete()
				# 			else:
				# 				employer = Employer(eid=re.sub("\s\s+" , " ", str(row['anon_Eid'])), name=str(row['anon_Name']),
				# 									created_at=dt.datetime.strptime(str(row['CreatedDate']),
				# 																	'%Y-%m-%dT%H:%M:%S.%fZ '),
				# 									modified_at=dt.datetime.strptime(str(row['ModifiedDate']),
				# 																	 '%Y-%m-%dT%H:%M:%S.%fZ '),
				# 									location=str(row['CorZipCode']),
				# 									lat=coords.x, lon=coords.y, branch_of_business=str(row['MCC']),
				# 									owner=user)
				#
				# 				employer.save()
				# 	except:
				# 		print("user exists")

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
			terminal_count = 0
			reader = csv.DictReader(csvfile)
			for row in reader:
				if terminal_count < 3:
					try:

						employer = Employer.objects.get(eid=re.sub("\s\s+", " ", str(row['anon_Eid'])))
						# a = dt.datetime.strptime(str(row['CreatedDate']),'%Y-%m-%dT%H:%M:%S.%fZ ')
						# b = dt.datetime.strptime(str(row['ModifiedDate']),'%Y-%m-%dT%H:%M:%S.%fZ ')
						terminal = Terminal(eid=employer.eid,employer=employer,
											created_at=dt.datetime.strptime(str(row['CreatedDate']),'%Y-%m-%dT%H:%M:%S.%fZ '),
											modified_at=dt.datetime.strptime(str(row['ModifiedDate']),'%Y-%m-%dT%H:%M:%S.%fZ '))
						terminal.save()
						terminal_count += 1
					except Employer.DoesNotExist:
						print("ERROR, EMPLOYER WITH THIS anon_EID - NOT FOUND")
						print(row)
						employer = Employer.objects.get(pk=random.randrange(1,6))
						terminal = Terminal(eid=employer.eid, employer=employer,
											created_at=dt.datetime.strptime(str(row['CreatedDate']),
																			'%Y-%m-%dT%H:%M:%S.%fZ '),
											modified_at=dt.datetime.strptime(str(row['ModifiedDate']),
																			 '%Y-%m-%dT%H:%M:%S.%fZ '))
						terminal.save()
						terminal_count += 1

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

		def strTimeProp(start, end, format, prop):
			"""Get a time at a proportion of a range of two formatted times.

			start and end should be strings specifying times formated in the
			given format (strftime-style), giving an interval [start, end].
			prop specifies how a proportion of the interval to be taken after
			start.  The returned time will be in the specified format.
			"""

			stime = time.mktime(time.strptime(start, format))
			etime = time.mktime(time.strptime(end, format))

			ptime = stime + prop * (etime - stime)

			return time.strftime(format, time.localtime(ptime))

		def randomDate(start, end, prop):
			return strTimeProp(start, end, '%Y-%m-%d %H:%M:%S', prop)


		# now create Transactions objects

		with open('TPD.csv', 'rt', encoding="utf-8") as csvfile:
			reader = csv.DictReader(csvfile)

			for row in reader:
				region = str(row['Region'])
				country = str(row['Country'])
				if region.__contains__("null"):
					region = "No region"

				if country.__contains__("null"):
					country = "No country"

				# na tym działało 2fdca20962edd3f7fcce07fcad1774b0

				# try:
				merchant = Employer.objects.get(pk=random.randrange(1,3))

				terminal = Terminal.objects.get(eid=merchant.eid)

				print(float(row['anon_Kwota']), str(row['anon_NrKarty']), region, country, merchant.location,
					  merchant.lat, merchant.lon, terminal)
				date_trans = randomDate("2019-1-1 00:00:00", "2019-6-9 00:00:00", random.random())


				payment = Payment(value=float(row['anon_Kwota']), card_number=str(row['anon_NrKarty']),
								  region="PL", country="Poland", location=merchant.location, lat=merchant.lat,
								  lon=merchant.lon, terminal=terminal,
								  created_at=dt.datetime.strptime(date_trans,'%Y-%m-%d %H:%M:%S'),
								  modified_at=dt.datetime.strptime(date_trans,'%Y-%m-%d %H:%M:%S'))
				payment.save()



					# except Employer.DoesNotExist:
					# 	print("This employer does not exist ")
					#
					# except Terminal.DoesNotExist:
					# 	print("This terminal does not exist ")
					#
					# except:
					# 	print("ERROR creating Payment record")