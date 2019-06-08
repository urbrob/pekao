from django.core.mail import send_mail
import boto3
from pekao.settings import AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY
from django.core.mail import send_mail


def send_sms(number, message):
    boto3.client(
        "sns",
        aws_access_key_id=AWS_ACCESS_KEY_ID,
        aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
        region_name="eu-west-1"
    ).publish(
        PhoneNumber=number,
        Message=message
    )

def send_notification(message, send_email, phone_number=None):
    send_mail('P4B - Strange activity in your shop', message, 'notification@p4b.com', [send_email], fail_silently=False)
    if phone_number:
        send_sms(phone_number, message)
