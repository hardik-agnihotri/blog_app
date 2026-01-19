import { axiosInstance } from "../utils/axiosInstance"


export const getAllBlog = async()=>{
    const response = await axiosInstance.get("/v1/blog/all-blogs");
    return response.data;
}

export const getAllUserBlog = async()=>{
    const response = await axiosInstance.get("/v1/blog/user-blogs")
    return response.data
}

export const createBlog = async(blogData)=>{
    const {data} = await axiosInstance.post("/v1/blog/create-blog",blogData);
    console.log(data);
    return data;
}

export const deleteBlog =async(id)=>{
    await axiosInstance.delete(`/v1/blog/delete-blog/${id}`)
    console.log("blog with id is deleted ",id);
}

export const getSingleBlog = async(blogId)=>{
    const response = await axiosInstance.get(`/v1/blog/getBlog/${blogId}`);
    console.log("singleblog",response)
    return response.data;
}

export const updateBlog = async(blogId,blogData)=>{
    const {data} = await axiosInstance.put(`/v1/blog/update-blog/${blogId}`,blogData);
    console.log(data);
    return data;
}

export const searchedBlogs = async(query)=>{
    const response = await axiosInstance.get(`/v1/blog/search?q=${query}`);
    return response.data;
}