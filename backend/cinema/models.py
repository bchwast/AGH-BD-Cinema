from mongoengine import Document, EmbeddedDocument, fields


class Reservation(EmbeddedDocument):
    firstname = fields.StringField(max_length=255, required=True)
    lastname = fields.StringField(max_length=255, required=True)
    email = fields.EmailField(required=True)
    number_of_places = fields.IntField(required=True)


class Term(EmbeddedDocument):
    date = fields.DateTimeField(required=True)
    reservations = fields.EmbeddedDocumentListField(Reservation)
    max_places = fields.IntField(required=True)


class Movie(Document):
    title = fields.StringField(max_length=255, required=True)
    description = fields.StringField(max_length=750, required=True)
    terms = fields.EmbeddedDocumentListField(Term)

    # def save(self, *args, **kwargs):
    #     for term in self.terms:
    #         if term.reservations.map()
