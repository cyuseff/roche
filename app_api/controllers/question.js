const { sendJSON } = require('./utils');
const Answer = require('../models/answer');
const User = require('../models/user');
const Question = require('../models/question');

const QUESTIONS = [
  new Question({
    id: 100,
    title: `El cáncer de mamas ha sido llamado la "Enfermedad de la monja" debido al gran número de monjas afectadas.`,
    resp: `Las monjas, como todas las mujeres que nunca tienen hijos, tienen un mayor riesgo de <strong>morir de cáncer de mama</strong>, ovario y útero, en comparación con las mujeres que han tenido hijos. El riesgo de una mujer de contraer estos cánceres aumenta con el número de ciclos menstruales que experimenta.`,
    value: true,
    avaliableAt: new Date(2017, 9, 26)
  }),
  new Question({
    id: 101,
    title: `El cáncer de mama ocurre tanto en perros como en gatos; pero tiende a ser más agresivo en perros`,
    resp: `No sólo los seres humanos sufren de cáncer de mama, algunos animales también. Es más común en los perros, pero <strong>tiende a ser más agresivo en los gatos.</strong>`,
    value: false,
    avaliableAt: new Date(2017, 9, 26)
  }),
  new Question({
    id: 102,
    title: `La miel que producen las avispas, se usaba en la antiguedad para el tratamiento de cáncer de mama.`,
    resp: `En la antiguedad erar la heces de algunos animales las que se utilizaban como tratamientos para el <strong>cáncer de mama</strong>. Un papiro egipcio recomendó una mezcla de cerebro de vaca y estiércol de avispa para ser aplicada a tumores de mama durante cuatro días. <strong>Las heces de insectos se consideraban uno de los tratamientos más avanzados para el cáncer de mama</strong> hasta la Edad Media. Afortunadamente, los tratamientos han avanzado mucho desde entonces.`,
    value: false,
    avaliableAt: new Date(2017, 9, 30)
  }),
  new Question({
    id: 103,
    title: `El primer registro de una mastectomía ofrecida para el cáncer de mama fue hace más de 1.500 años.`,
    resp: `<strong>El primer registro de una mastectomía fue en el año 548 DC a Theodora</strong>, emperatriz de Bizantino. El progreso significativo en nuestra comprensión y tratamiento del cáncer de mama en las décadas recientes ha visto una reducción dramática en el uso de la mastectomía "radical" (donde la mama, músculo del pecho y ganglios linfáticos subyacentes se extirpan), que era el acercamiento quirúrgico estándar para el cáncer de mama hasta los años sesenta.`,
    value: true,
    avaliableAt: new Date(2017, 9, 30)
  }),
  new Question({
    id: 104,
    title: `Sólo las mujeres pueden tener cáncer de mama, el riesgo en hombres es un mito.`,
    resp: `Muchas personas no se dan cuenta de que los hombres tienen tejido mamario y que <strong>pueden desarrollar cáncer de mama</strong>. Pero el cáncer de mama es menos común en los hombres debido a que sus células del conducto mamario son menos desarrolladas que las de las mujeres y porque normalmente tienen niveles más bajos de hormonas femeninas que afectan el crecimiento de las células mamarias.`,
    value: false,
    avaliableAt: new Date(2017, 10, 2)
  }),
  new Question({
    id: 105,
    title: `El cáncer de mama puede atacar a ambas mamas por igual, no importando si es la derecha o izquierda.`,
    resp: `<strong>La mama izquierda es 5 - 10% más propensa a desarrollar cáncer que la mama derecha</strong>. El lado izquierdo del cuerpo también es aproximadamente un 5% más propenso a melanoma (un tipo de cáncer de piel). Nadie sabe realmente por qué esto es así.`,
    value: false,
    avaliableAt: new Date(2017, 10, 2)
  }),
  new Question({
    id: 106,
    title: `Los trabajos de turno nocturnos no influyen en el riesgo de cáncer de mama.`,
    resp: `La Agencia Internacional de Investigación sobre el Cáncer concluyó recientemente que <strong>las mujeres que trabajaban turnos nocturnos por 30 años o más tenían el doble de probabilidades de desarrollar cáncer de mama</strong>. Sin embargo, las mujeres que trabajan por la noche se les aconseja no entrar en pánico. Vale la pena señalar que no se encontró ningún vínculo entre el mayor riesgo de cáncer de mama y los períodos de trabajo nocturno que fueron menores de 30 años.`,
    value: false,
    avaliableAt: new Date(2017, 10, 6)
  }),
  new Question({
    id: 107,
    title: `La mayoría de las mujeres sobreviven al cáncer de mama <small><em>(al menos en los países desarrollados)</em></small>.`,
    resp: `En los últimos años se han logrado enormes progresos en el cáncer de mama. De hecho, el manejo del cáncer de mama a través de la evaluación del riesgo, la prevención, la cirugía, la radiación y otros tratamientos, han cambiado dramáticamente. <strong>Las tasas de mortalidad por cáncer de mama en los países más desarrollados han estado disminuyendo en los últimos años, y ahora las tasas de supervivencia son del 80% o más</strong> en países como Estados Unidos, Suecia y Japón. Sin embargo, las tasas de supervivencia se mantienen por debajo del 40% en los países de bajos ingresos.`,
    value: true,
    avaliableAt: new Date(2017, 10, 6)
  }),
  new Question({
    id: 108,
    title: `El cáncer de mama HER2 positivo afecta aproximadamente al 25% de las mujeres con cáncer de mama`,
    resp: `El receptor HER2+ significa que el oncogen se encuentra amplificado o sobre expresado en la superficie de las células cancerígenas. Esto se traduce en una <strong>proliferación o multiplicación descontrolada de las células malignas</strong>.`,
    value: true,
    avaliableAt: new Date(2017, 10, 9)
  }),

  new Question({
    id: 109,
    title: `El cáncer de mama HER2+ temprano no tiene opción de cura`,
    resp: `El cáncer de mama HER2+ en etapa temprana tratadas con Herceptin, <strong>7 de cada 10 mujeres están vivas y libre de enfermedad</strong> a los 11 años (Estudio HERA).`,
    value: false,
    avaliableAt: new Date(2017, 10, 9)
  }),

  new Question({
    id: 110,
    title: `La mamografía es el examen de elección para detectar el cáncer de mama`,
    resp: `La mamografía permiteobservar la estructura de la mama, permitiendo detectar lesiones mamarias. <strong>La mamografía permite un diagnóstico de cáncer de mama oportuno y temprano,</strong> permitiendo mayores opciones de curación.`,
    value: true,
    avaliableAt: new Date(2017, 10, 14)
  }),

  new Question({
    id: 111,
    title: `El autoexamen mamario se debe realiar una vez por semana`,
    resp: `El autoexamen de mama se <strong>recomienda realizarlo mensualmente, idealmente 3 a 4 días post menstruación.</strong> De todas formas esto no sustituye la mamografía ni el examen clínico por un profesional de la salud.`,
    value: false,
    avaliableAt: new Date(2017, 10, 14)
  }),

  new Question({
    id: 112,
    title: `Una de las actrices de la famosa serie "Sex and the City" tuvo cáncer de mama`,
    resp: `La famosa actriz Miranda Hobbes de Sex and the City <strong>fue diagnosticada con cáncer de mama el año 2006</strong>, gracias a una mamografía que se realizó y salió alterada. Actualmente es una famosa activista que lucha contra el cáncer de mama y su prevención.`,
    value: true,
    avaliableAt: new Date(2017, 10, 16)
  }),

  new Question({
    id: 113,
    title: `El cáncer de mama es la segunda causa de muerte por cáncer en mujeres chilenas`,
    resp: `Actualmente el <strong>cáncer de mama ocupa el primer lugar dentro de las causas de muertes</strong> por cáncer en mujeres chilenas (Departamento de Estadistica, MINSAL 2012).`,
    value: false,
    avaliableAt: new Date(2017, 10, 16)
  })

];

const avaliableQuestions = (questions, now) =>
  questions.reduce((qs, q) => {
    if (q.avaliableAt <= now) {
      return [...qs, q];
    }
    return qs;
  }, []);

const userNextQuestion = (questions, answers) => {
  // not avaliable
  if (!questions.length) {
    return null;
  }

  for (var i = 0, l = questions.length; i < l; i++) {
    const question = questions[i];
    const answer = answers.find(a => a.questionId === question.id);

    // no answer for this question
    if(!answer) {
      return question;
    }
    // this questions had not been answered
    if(!answer.updatedAt) {
      return question;
    }
  }
  return null;
};

const getNextOpenDate = (questions, now) => {
  let next = null;
  for(let i = 0, l = questions.length; i < l; i++) {
    const q = questions[i];
    if(q.avaliableAt > now) {
      return q.avaliableAt;
    }
  }
};

const getQuestions = (req, res) => {
  const questions = avaliableQuestions(QUESTIONS, new Date());
  return sendJSON(res, 200, {questions});
};

const getNextQuestion = (req, res) => {
  User
    .findById(req.userId)
    .then(user => {
      if (!user) {
        return sendJSON(res, 404, {err: 'user not found'});
      }

      const now = new Date();
      const questions = avaliableQuestions(QUESTIONS, now);
      const next = (
        QUESTIONS.length === questions.length &&
        user.answers === questions.length
      );

      const nextOpenDate = getNextOpenDate(QUESTIONS, now);

      // no questions avaliable
      if(!questions.length) {
        return sendJSON(res, 200, {
          question: null,
          next,
          next_date: nextOpenDate,
          meta: 'no questions avaliable'
        });
      }

      const question = userNextQuestion(questions, user.answers);
      // no question avaliable
      if(!question) {
        return sendJSON(res, 200, {
          question: null,
          next,
          next_date: nextOpenDate,
          meta: next
            ? 'no questions avaliable for user'
            : 'user has answer all questions'
        });
      }

      // check if there is an answer
      let answer = user.answers.find(a => a.questionId === question.id);
      if (answer) {
        return sendJSON(res, 200, {
          question: question.publicQuestion(),
          next,
          next_date: nextOpenDate,
          meta: 'answer find for user'
        });
      }

      // create a new answer for this question
      answer = new Answer(question.id);
      user.answers.push(answer);

      user
        .save()
        .then(() => sendJSON(res, 200, {
          question: question.publicQuestion(),
          next,
          next_date: nextOpenDate,
          meta: 'answer created for user'
        }))
        .catch(err => sendJSON(res, 500, {err: err.toString()}));
    })
    .catch(err => sendJSON(res, 500, {err: err.toString()}));
};

module.exports = {
  QUESTIONS,
  getQuestions,
  getNextQuestion
};