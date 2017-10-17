
module.exports = (router) => {

  /**
   * @swagger
   * definitions:
   *   Boards:
   *     required:
   *       - _id
   *       - title
   *     properties:
   *       _id:
   *         type: string
   *       title:
   *         description: "Title of a board is unique"
   *         type: string
   *       visibility:
   *         type: string
   *         enum: ['Public','Private','Team']
   *       isArchived:
   *         type: boolean
   *         default: false
   *       createdAt:
   *         type: date 
   *       lists:
   *         type: array
   *         items: string
   *     example:
   *       _id: 59dbf8c5365cff4a3714be9e
   *       title: Test Swagger Board
   *       visibility: Private
   *       createdAt: 2017-10-09T22:31:33.078Z
   *       isArchived: false
   *       lists: ['59dbf8c5365cff4a3714be9r',57dbf8c5365cff4a3714be9e]
   *       
   */

  /**
   * @swagger
   * definitions:
   *   NewBoard:
   *     required:
   *       - title
   *     properties:
   *       title:
   *         description: "Title of a board is unique"
   *         type: string
   *       visibility:
   *         type: string
   *         enum: ['Public','Private','Team']
   *       isArchived:
   *         type: boolean
   *         default: false
   *       createdAt:
   *         type: date 
   *     example:
   *       title: Test Swagger Board
   *       visibility: Private
   *       createdAt: 2017-10-09T22:31:33.078Z
   *       isArchived: false
   *       
   */

  /**
   * @swagger
   * definitions:
   *   BoardsFull:
   *     required:
   *       - _id
   *       - title
   *     properties:
   *       _id:
   *         type: string
   *       title:
   *         description: "Title of a board is unique"
   *         type: string
   *       visibility:
   *         type: string
   *         enum: ['Public','Private','Team']
   *       isArchived:
   *         type: boolean
   *         default: false
   *       createdAt:
   *         type: date 
   *       lists:
   *         type: array
   *         items: '#definitions/Lists'
   *     example:
   *       _id: 59dbf8c5365cff4a3714be9e
   *       title: Test Swagger Board
   *       visibility: Private
   *       createdAt: 2017-10-09T22:31:33.078Z
   *       isArchived: false
   *       lists: [{_id: 59dbf8c5365cff4a3714be9e,title: Test Swagger Board,visibility: Private,createdAt: 2017-10-09T22:31:33.078Z,isArchived: false},
   *               {_id: 59dbf8c5365cff4a3714bg6e,title: Test Swagger Board 2,visibility: Public,createdAt: 2017-10-09T22:31:33.078Z,isArchived: false}]
   *       
   */ 

  const boards = require('../../controllers/boardController')

  
 /**
  * @swagger
  * /boards:
  *   get:
  *     tags:
  *       - Boards
  *     description: Get all boards
  *     summary: Get all boards of the application
  *     produces:
  *       - application/json
  *     responses:
  *       200:
  *         description: An array of boards
  *         schema:
  *           $ref: '#/definitions/Boards'
  *       400:
  *         description: Bad Request
  */
  router.route('/boards').get(boards.get_all_boards)

 /**
  * @swagger
  * /boards/{board_id}:
  *   get:
  *     tags:
  *       - Boards
  *     description: Get a board with poppulate lists 
  *     summary: Get a board related to the id in param
  *     produces:
  *       - application/json
  *     parameters:
  *        - name: board_id
  *          description: The id of the board that needs to be return
  *          in: path
  *          required: true
  *          type: string 
  *     responses:
  *       200:
  *         description: The board related to the id
  *         schema:
  *           $ref: '#/definitions/BoardsFull'
  *       400:
  *         description: Bad Request
  */
  router.route('/boards/:board_id').get(boards.get_one_board)

 /**
  * @swagger
  * /boards:
  *   post:
  *     tags:
  *       - Boards
  *     description: Post a new board
  *     summary: Create a new board
  *     produces:
  *       - application/json
  *     parameters:
  *        - name: body
  *          description: A Board object that needs to be post
  *          in: body
  *          required: true
  *          schema:
  *             $ref: '#/definitions/NewBoard'
  *     responses:
  *       201:
  *         description: The new board
  *         schema:
  *           $ref: '#/definitions/Boards'
  *       400:
  *         description: Bad Request
  */
  router.route('/boards').post(boards.create_board)
  
 /**
  * @swagger
  * /boards/{board_id}:
  *   put:
  *     tags:
  *       - Boards
  *     description: Update a board
  *     summary: Update a board related to id in param
  *     produces:
  *       - application/json
  *     parameters:
  *        - name: body
  *          description: A Board object that needs to be update
  *          in: body
  *          required: true
  *          schema:
  *             $ref: '#/definitions/NewBoard'
  *        - name: board_id 
  *          description: The id of the board that needs to be updated
  *          in: param
  *          required: true
  *          type: string
  *     responses:
  *       200:
  *         description: The new board
  *         schema:
  *           $ref: '#/definitions/Boards'
  *       400:
  *         description: Bad Request
  */
  router.route('/boards/:board_id').put(boards.update_board)

 /**
  * @swagger
  * /boards/{board_id}:
  *   delete:
  *     tags:
  *       - Boards
  *     description: Delete a board
  *     summary: Delete a board related to the id in param
  *     produces:
  *       - application/json
  *     parameters:
  *        - name: board_id
  *          description: The id of the board that needs to be deleted
  *          in: path
  *          required: true
  *          type: string 
  *     responses:
  *       200:
  *         description: Confirmation message that a board has been deleted
  *       400:
  *         description: Bad Request
  */
  router.route('/boards/:board_id').delete(boards.delete_board)
}