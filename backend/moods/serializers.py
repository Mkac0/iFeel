from rest_framework import serializers
from .models import MoodEntry

class MoodEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = MoodEntry
        fields = [
            'id',
            'date',
            'emotions',
            'score',
            'note',
            'recorded_at',
        ]
        read_only_fields = ['id', 'recorded_at']
    
    def validare_emotions(self, value):
        if (
            not isinstance(value, list) 
            or not value
            or any(
                not isinstance(emotion, str) 
                or not emotion.strip() 
                for emotion in value
            )
        ):
            raise serializers.ValidationError(
                "Choose at least one valid emotion."
            )
        
        return value