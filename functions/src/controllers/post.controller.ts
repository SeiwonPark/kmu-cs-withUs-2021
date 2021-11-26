import { Request, Response } from "express"
import { db } from "../config/firebase"


/**
 * Get post data
 * @route GET /post/get
 */
export const getPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category } = req.query
    const snapshot = await db
      .collection("Post")
      .where("category", "==", category)
      .orderBy("createdAt", "desc")
      .get()
    const result = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    console.log(result)
    res.send(result)
  } catch (error) {
    console.log("Error on getting posts:", error)
  }
}


/**
 * Get post detail data
 * @route GET /post/detail
 */
export const getPostDetail = async (req: Request, res: Response): Promise<void> => {
  try {
    const uid = Object(req.query)
    const { postUid } = uid
    if (postUid) {
      const doc = await db.collection("Post").doc(postUid).get()
      console.log(doc.data())
      res.json(doc.data())
    } else {
      throw Error("Cannot get post data")
    }
  } catch (error) {
    console.log("Error on getting post", error)
  }
}


/**
 * Create a new post
 * @route POST /post/create
 */
export const createPost = async (req: Request, res: Response): Promise<void> => {
  try {
    if (res.locals.isAnonymous) {
      res.send({ success: false })
    }
    const { author, category, displayName, title, content, postImage } = req.body
    if (!author && !category && !displayName && !title && !content) {
      console.log("No payload from user")
      res.send({ "success": false }) // FIXME: throw empty payload error
    }

    const ref = await db.collection("Post").add({
      author: author,
      category: category,
      displayName: displayName,
      title: title,
      content: content,
      likes: 0,
      comments: 0,
      postImage: postImage,
      createdAt: new Date,
    })
    await db.collection("Post").doc(ref.id).update({
      uid: ref.id,
    })
    res.send({ success: true })
  } catch (error) {
    console.log("Error on creating a new post:", error)
  }
}


/**
 * Modify post data
 * @route POST /post/modify
 */
export const modifyPost = async (req: Request, res: Response): Promise<void> => {
  try {
    // TODO:
  } catch (error) {
    // TODO:
  }
}


/**
 * Delete a post
 * @route GET /post/delete
 */
export const deletePost = async (req: Request, res: Response): Promise<void> => {
  try {
    // TODO:
  } catch (error) {
    // TODO:
  }
}
