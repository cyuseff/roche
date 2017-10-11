function Question(obj) {
  const { id, title, description, value, avaliableAt } = obj;
  this.id = id;
  this.title = title;
  this.description = description;
  this.value = value;
  this.avaliableAt = avaliableAt;
}

Question.prototype.publicQuestion = function() {
  const { id, title, description } = this;
  return {id, title, description};
};

module.exports = Question;