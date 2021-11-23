package com.with.us.services.api;

import com.with.us.models.PostDetail;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.POST;
import retrofit2.http.Query;

public interface PostService {
    @GET("post/get")
    Call<List<PostDetail>> getPostDetail(@Header("Authorization") String auth, @Query("category") String category);

    @POST("post/create")
    Call<List<PostDetail>> createPostDetail(@Header("Authorization") String auth, @Body PostDetail postDetail);

    @POST("post/modify")
    Call<List<PostDetail>> modifyPostDetail(@Header("Authorization") String auth, @Body PostDetail postDetail);

    @GET("post/delete")
    Call<List<PostDetail>> deletePostDetail(@Header("Authorization") String auth);
}
