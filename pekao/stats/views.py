from django.views.generic import View
from django.utils import timezone
from .renderPDF import Render


class Pdf(View):

    def get(self, request, id):
        today = timezone.now()
        params = {
            'today': today,
        }
        return Render.render('pdf/pdf.html', params)
