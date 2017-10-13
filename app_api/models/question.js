function Question(obj) {
  const { id, title, resp, value, avaliableAt } = obj;
  this.id = id;
  this.title = title;
  this.resp = resp;
  this.value = value;
  this.avaliableAt = avaliableAt;
}

Question.prototype.publicQuestion = function() {
  const { id, title } = this;
  return {id, title};
};

Question.prototype.getAnswer = function() {
  const { id, title, resp, value } = this;
  return {id, title, resp, value};
};

module.exports = Question;