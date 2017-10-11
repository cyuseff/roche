function Answer(questionId) {
  this.questionId = questionId;
  
  this.createdAt = new Date();
  this.updatedAt = null;
  this.time = null;

  this.value = null;
  this.correct = null;
  this.points = null;
}

module.exports = Answer;