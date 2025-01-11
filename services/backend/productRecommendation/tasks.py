from celery import shared_task
from account.models import User
from comment.models import Comment
from .models import Cluster
from .suggestions import update_clusters

@shared_task
def executeProductRecommendation(user_id,username):
    user_reviews = Comment.objects.filter(user_id=user_id).prefetch_related('product')
    user_reviews_product_ids = set(map(lambda x: x.product.id, user_reviews))

    try:
        user_cluster_name = \
            User.objects.get(username=username).cluster_set.first().name
    except:
        update_clusters(is_new_user=True)
        user_cluster_name = \
            User.objects.get(username=username).cluster_set.first().name

    user_cluster_other_members = \
        Cluster.objects.get(name=user_cluster_name).users \
            .exclude(id=user_id).all()
    other_members_user_ids = set(map(lambda x: x.id, user_cluster_other_members))

    other_users_reviews = \
        Comment.objects.filter(user_id__in=other_members_user_ids) \
            .exclude(product__id__in=user_reviews_product_ids)
    other_users_reviews_product_ids = set(map(lambda x: x.product.id, other_users_reviews))

    return other_users_reviews_product_ids