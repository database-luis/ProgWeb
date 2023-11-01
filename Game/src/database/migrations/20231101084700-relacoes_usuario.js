'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('usuarios', {
      type: 'foreign key',
      fields: ['cursoId'],
      name: 'usuario_curso_fk',
      references: {
        table: 'cursos',
        field: 'id'
      },
      onDelete: 'restrict',
      onUpdate: 'restrict'
    })
  },

  down: async(queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      'usuarios',
      'usuario_curso_fk'
    )
  }
};
