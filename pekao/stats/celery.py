from celery import task
from stats.models import Employer, Payment
from django.utils import timezone
from django.db.models import Q, Count
import datetime as dt
from datetime import datetime
from pekao.utils import send_notification


@task(name='check_suspicious_situation')
def check_suspicious_situation():
    now = datetime.now()
    month_ago = now - dt.timedelta(weeks=4)
    one_hour = now - dt.timedelta(days=1)
    for employer in Employer.objects.all():
        avg = Payment.objects.filter(terminal__employer=employer, created_at__gt=month_age, created_at__lt=now).aggregate(Count('id'))['id__count']
        avg_now = Payment.objects.filter(terminal__employer=employer, created_at__gt=one_hour, created_at__lt=now).aggregate(Count('id'))['id__count']
        if avg_now * 4 < avg and avg > 10:
            send_notification('We detected a strange low activity in your store. I recommend checking. Now in the shop they operate: Ada, Kamil',
                employer.owner.email,
                employer.phone_number
            )
        elif avg_now > avg * 4 and avg > 10:
            send_notification(
                'We detected a strange high activity in your store. I recommend checking. Now in the shop they operate: Ada, Kamil',
                 employer.owner.email,
                 employer.phone_number
            )
