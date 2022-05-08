from mongoengine import Document, EmbeddedDocument, fields, ValidationError


class Reservation(EmbeddedDocument):
    firstname = fields.StringField(max_length=255, required=True)
    lastname = fields.StringField(max_length=255, required=True)
    email = fields.EmailField(required=True)
    number_of_places = fields.IntField(required=True)


class Term(EmbeddedDocument):
    date = fields.DateTimeField(required=True)
    reservations = fields.EmbeddedDocumentListField(Reservation, required=True)
    max_places = fields.IntField(required=True)


class Movie(Document):
    title = fields.StringField(max_length=255, required=True)
    description = fields.StringField(max_length=750, required=True)
    terms = fields.EmbeddedDocumentListField(Term, required=True)

    def save(self, *args, **kwargs):
        for term in self.terms:
            if sum(map(lambda x: x.number_of_places, term.reservations)) > term.max_places:
                raise ValidationError("Not enough places for term")

        super(Movie, self).save(*args, **kwargs)
