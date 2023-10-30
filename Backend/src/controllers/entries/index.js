const postRecomendation = require("./postRec");
const getRecomendationById = require("./getRecById");
const getRecomendationByPlace = require("./getRecByPlace");
const getRecomendationByCategory = require("./getRecByCategory");
const voteRec = require("./voteRec");
const getRecByVote = require("./getRecByVote");
const postComment = require("./postComment");
const deleteRec = require("./deleteRec");
const getAllRec = require("./getAllRec");
const deleteComment = require("./deleteComment");

module.exports = {
  postRecomendation,
  getRecomendationById,
  getRecomendationByPlace,
  getRecomendationByCategory,
  voteRec,
  getRecByVote,
  postComment,
  deleteRec,
  getAllRec,
  deleteComment,
};
