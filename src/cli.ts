import inquirer from 'inquirer';

const courses = ['Angular', 'React', 'Node'];

type Answers = {
  userName: string;
  age: number;
  course: string;
  multiCourses: string[];
  isOk: boolean;
  level: number;
};

const getData = async () => {
  const answers: Answers = await inquirer.prompt([
    {
      name: 'userName',
      message: 'Dime tu nombre',
      type: 'input',
    },
    {
      name: 'age',
      message: 'Dime tu edad',
      type: 'number',
    },
    {
      name: 'course',
      message: 'Selecciona un curso',
      type: 'list',
      choices: courses,
    },
    {
      name: 'multiCourse',
      message: 'Selecciona varios cursos',
      type: 'checkbox',
      choices: courses,
    },
    {
      name: 'isOk',
      message: 'Aceptas bla bla bla....',
      type: 'confirm',
    },
  ]);

  if (answers.course === 'Angular') {
    await setAngularLevel(answers);
  }
};

const setAngularLevel = async (answers: Answers) => {
  const plus = await inquirer.prompt({
    name: 'ngLevel',
    message: 'Nivel de angular (1 - 5)',
    type: 'number',
  });

  if (plus.ngLevel > 0 && plus.ngLevel < 6) {
    answers.level = plus.ngLevel;
    console.log(answers);
  } else {
    setAngularLevel(answers);
  }
};

getData();
