'use strict';

const { sequelize } = require('../../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('cursos', {
      type: 'foreign key',
      fields: ['areaId'],
      name: 'curso_area_fk',
      references: {
        table: 'areas',
        field: 'id'
      },
      onDelete: 'restrict',
      onUpdate: 'restrict'
    })
  },

  down: async(queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      'cursos',
      'curso_area_fk'
    )
  }
};
