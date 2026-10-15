from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import MoodEntry
from .serializers import MoodEntrySerializer

class MoodEntryViewSet(viewsets.ModelViewSet):
    serializer_class = MoodEntrySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return MoodEntry.objects.filter(
            user=self.request.user
        ).order_by('-date', '-recorded_at')
    
    def perform_create(self, serializer):
        date = serializer.validated_data['date']

        existing_entry = (
            MoodEntry.objects.filter(
                user=self.request.user,
                date=date
        )
        .order_by('-recorded_at', '-id')
        .first()
        )

        if existing_entry:
            for field, value in serializer.validated_data.items():
                setattr(existing_entry, field, value)
            existing_entry.save()
            serializer.instance = existing_entry
        else:
            serializer.save(user=self.request.user)
