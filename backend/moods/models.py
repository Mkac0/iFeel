from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator

class MoodEntry(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        related_name='mood_entries'
    )

    date = models.DateField()
    emotions = models.JSONField(default=list)
    score = models.PositiveSmallIntegerField(
        validators=[
            MinValueValidator(1), 
            MaxValueValidator(10)
        ]
    )
    note = models.TextField(blank=True, null=True)
    recorded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} - {self.date} - {self.score}/10"
