const express = require('express')
const Post = require('../models/Post')

//have a req.session conditional on all post requests to prevent unauthorized acess

exports.getAllPostsNames = async (req, res, next) => {
  const [allPosts, _] = await Post.getAllPostsNames()
  //send all posts to display home page and give each post a user id
  res.status(200).json({ allPosts })
}
exports.createNewPost = async (req, res, next) => {
  if (!req.session.user) return res.json({ message: 'Not logged in' })
  try {
    let {
      about,
      appearance,
      name,
      image,
      realName,
      gender,
      firstGame,
      lastGame,
      birthPlace,
      trivia,
      userId,
    } = req.body
    await Post.savePost(
      about,
      appearance,
      name,
      image,
      realName,
      gender,
      firstGame,
      lastGame,
      birthPlace,
      userId
    )
    let [id, _] = await Post.getCurrentId()
    const postId = id[0]['MAX(id)']
    await Post.saveTrivia(postId, trivia)
    const [posts, __] = await Post.getAllPostsNames()
    //going to redirect after creating post to home page need to give a new state to all posts
    res.status(200).json(posts)
  } catch (err) {
    console.log(err)
    next(err)
  }
}
exports.getPostById = async (req, res, next) => {
  let postid = req.params.id
  try {
    let [posts, _] = await Post.findOnePost(postid)
    const [trivia, __] = await Post.findTriviaByPost(postid)

    const fullPost = { ...posts[0], trivia: [...trivia] }
    res.status(200).json(fullPost)
  } catch (err) {
    console.log(err)
    next(err)
  }
}

exports.updatePostRecords = async (req, res, next) => {
  if (!req.session.user) return res.json({ message: 'Not logged in' })
  try {
    const postid = req.params.id
    const data = req.body
    for (const record in data) {
      if (record != 'trivia') {
        await Post.updatePostRecord(record, data[record], postid)
      }
    }
    //best way is to replace
    await Post.deleteTriviaRecord(postid)
    for (let i = 0; i < data.trivia.length; i++) {
      await Post.updateTriviaRecord(data.trivia[i], postid)
    }
    const [posts, _] = await Post.getAllPostsNames()
    res.status(200).json(posts)
  } catch (err) {
    console.log(err)
    next(err)
  }
}
exports.deletePost = async (req, res, next) => {
  if (!req.session.user) return res.json({ message: 'Not logged in' })

  try {
    const postid = req.params.id
    if (postid == 1) {
      res.json({ message: 'Admin Acess Needed' })
    } else {
      await Post.deletepOnePost(postid)
      res.status(200).json({ message: 'SUCESS' })
    }
  } catch (err) {
    console.log(err)
    next(err)
  }
}
