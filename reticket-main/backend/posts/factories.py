import factory


class PostFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = 'posts.Post'

    event = factory.Sequence(lambda n: 'Event %d' % n)

    post_type = "BUYING"

    price = factory.Sequence(lambda n: n)

    description = factory.Sequence(lambda n: 'Description #%d' % n)

    location = factory.Sequence(lambda n: 'Location #%d' % n)
