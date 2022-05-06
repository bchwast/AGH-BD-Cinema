from rest_framework_mongoengine.serializers import DocumentSerializer, EmbeddedDocumentSerializer
from cinema.models import Movie


class MovieSerializer(DocumentSerializer):

    class Meta:
        model = Movie
        depth = 2
