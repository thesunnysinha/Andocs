from django.contrib.auth import get_user_model
User = get_user_model()
from sklearn.cluster import KMeans
from scipy.sparse import dok_matrix, csr_matrix
import numpy as np
from comment.models import Comment
from .models import Cluster

def update_clusters(is_new_user):
    num_reviews = Comment.objects.count()
    print(num_reviews)
    update_step = 6
    print(update_step)
    if num_reviews % update_step == 0 or is_new_user:
        all_user_ids = list(map(lambda x: x.id, User.objects.only("id")))
        all_product_ids = set(map(lambda x: x.product.id, Comment.objects.only("product")))
        num_users = len(all_user_ids)
        ratings_m = dok_matrix((num_users, max(all_product_ids) + 1), dtype=np.float32)
        for i in range(num_users):  
            user = User.objects.get(id=all_user_ids[i])
            user_reviews = Comment.objects.filter(user_id=all_user_ids[i])
            for user_review in user_reviews:
                ratings_m[i, user_review.product.id] = user_review.rating
        
        k = int(num_users / 10) + 2
        kmeans = KMeans(n_clusters=k)
        clustering = kmeans.fit(ratings_m.tocsr())

        Cluster.objects.all().delete()
        new_clusters = {i: Cluster(name=User.objects.get(id=all_user_ids[i]).username) for i in range(k)}

        for cluster in new_clusters.values():
            cluster.save()
        for i, cluster_label in enumerate(clustering.labels_):
            new_clusters[cluster_label].users.add(User.objects.get(id=all_user_ids[i]))

        print(new_clusters)
