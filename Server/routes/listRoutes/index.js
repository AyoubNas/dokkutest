
module.exports = (router) => {  
  /**
   * @swagger
   * definitions:
   *   Lists:
   *     required:
   *       - _id
   *       - title
   *     properties:
   *       _id:
   *         type: string
   *       title:
   *         type: string
   *       isArchived:
   *         type: boolean
   *         default: false
   *       createdAt:
   *         type: date 
   *     example:
   *       _id: 59dbf8c5365cff4a3714be9e
   *       title: Test Swagger Board
   *       createdAt: 2017-10-09T22:31:33.078Z
   *       isArchived: false
   *       
   */ 

  /**
   * @swagger
   * definitions:
   *   NewList:
   *     required:
   *       - _id
   *       - title
   *     properties:
   *       _id:
   *         type: string
   *       title:
   *         type: string
   *     example:
   *       _id: 59dbf8c5365cff4a3714be9e
   *       title: Test Swagger Board
   *       
   */ 
    
    const lists = require('../../controllers/listController')
    
   /**
    * @swagger
    * /boards/{board_id}/lists:
    *   post:
    *     tags:
    *       - Lists
    *     description: Post a new list related to a board
    *     summary: Create a new list
    *     produces:
    *       - application/json
    *     parameters:
    *        - name: body
    *          description: A List object that needs to be post
    *          in: body
    *          required: true
    *          schema:
    *             $ref: '#/definitions/NewList'
    *     responses:
    *       201:
    *         description: The new list
    *         schema:
    *           $ref: '#/definitions/Lists'
    *       400:
    *         description: Bad Request
    */
    router.route('/boards/:board_id/lists').post(lists.create_list)
    
   /**
    * @swagger
    * /boards/{board_id}/lists/{list_id}:
    *   put:
    *     tags:
    *       - Lists
    *     description: Update a list
    *     summary: Update a list related to list & board id in param
    *     produces:
    *       - application/json
    *     parameters:
    *        - name: body
    *          description: A List object that needs to be update
    *          in: body
    *          required: true
    *          schema:
    *             $ref: '#/definitions/NewList'
    *        - name: board_id 
    *          description: The id of the board related to the list
    *          in: param
    *          required: true
    *          type: string
    *
    *        - name: list_id 
    *          description: The id of the list that needs to be updated
    *          in: param
    *          required: true
    *          type: string
    *     responses:
    *       200:
    *         description: The new list
    *         schema:
    *           properties:
    *             -lists:
    *               type: array
    *               items: string
    *       400:
    *         description: Bad Request
    */
    router.route('/boards/:board_id/lists/:list_id').put(lists.update_list)

    /**
    * @swagger
    * /boards/{board_id}/lists/{list_id}/move:
    *   put:
    *     tags:
    *       - Lists
    *     description: Move a list to a new position
    *     summary: Move a list to a new position in board's lists array
    *     produces:
    *       - application/json
    *     parameters:
    *        - name: body
    *          description: A List object that needs to be update
    *          in: body
    *          required: true
    *          schema:
    *           required:
    *              - position
    *           properties:
    *             position:
    *               type: integer
    *             
    *        - name: board_id 
    *          description: The id of the board related to the list
    *          in: param
    *          required: true
    *          type: string
    *
    *        - name: list_id 
    *          description: The id of the list that needs to be move
    *          in: param
    *          required: true
    *          type: string
    *     responses:
    *       200:
    *         description: The array of lists updated
    *         schema:
    *             type: array
    *             items: 
    *               $ref: '#/definitions/Lists'
    *       400:
    *         description: Bad Request
    */
    router.route('/boards/:board_id/lists/:list_id/move').put(lists.move_list)

  /**
    * @swagger
    * /boards/{board_id}/lists/{list_id}:
    *   delete:
    *     tags:
    *       - Lists
    *     description: Delete a list
    *     summary: Delete a list related to the board & list id in param
    *     produces:
    *       - application/json
    *     parameters:
    *        - name: board_id
    *          description: The id of the board related to the list
    *          in: path
    *          required: true
    *          type: string   
    *
    *        - name: list_id
    *          description: The id of the list that needs to be deleted
    *          in: path
    *          required: true
    *          type: string 
    *     responses:
    *       200:
    *         description: Confirmation message that a list has been deleted
    *       400:
    *         description: Bad Request
    */
    router.route('/boards/:board_id/lists/:list_id').delete(lists.delete_list)
}