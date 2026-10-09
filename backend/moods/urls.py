from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MoodEntryViewSet

router = DefaultRouter()
router.register(
    r'moods', 
    MoodEntryViewSet,
    basename='mood'
)

urlpatterns = [
    path('', include(router.urls)),
]
