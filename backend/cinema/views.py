from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from rest_framework import status

from cinema.models import Movie
from cinema.serializers import MovieSerializer


@api_view(['GET', 'POST', 'DELETE'])
def movie_list(request):
    if request.method == 'POST':
        new_movie = JSONParser().parse(request)
        movie_serializer = MovieSerializer(data=new_movie)
        if movie_serializer.is_valid():
            movie_serializer.save()
            return JsonResponse(movie_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(movie_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        movies = Movie.objects.all()
        movies_serializer = MovieSerializer(movies, many=True)
        return JsonResponse(movies_serializer.data, safe=False)
    elif request.method == 'DELETE':
        Movie.objects.all().delete()
        return JsonResponse({'message': 'Movies deleted successfully'}, status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'PUT', 'DELETE'])
def movie_detail(request, pk):
    pass
