'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('partidas', {
      type: 'foreign key',
      fields: ['usuarioId'],
      name: 'partida_usuario_fk',
      references: {
        table: 'usuarios',
        field: 'id'
      },
      onDelete: 'restrict',
      onUpdate: 'restrict'
    })
  },

  down: async(queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      'partidas',
      'partida_usuario_fk'
    )
  }
};
