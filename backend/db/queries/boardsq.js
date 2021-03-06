const { db } = require('../index.js')

const getAllBoardsWithPinsCurrentUser = (req, res, next) => {
    let userId = req.params.name
    db.any('SELECT * FROM boards JOIN pins ON (boards.id=board_id) JOIN users ON (pins.id=pins.id) WHERE users.username=$1 ORDER BY pins.id DESC', [userId])
    .then(boards => {
        res.status(200).json({
            status: 'success',
            boards: boards,
            message: 'all boards'
        })
    })
    .catch((err) => {
        next(err)
    })
}

// const getAllBoardsWithPinsCurrentUser = (req, res, next) => {
//     db.any('SELECT * FROM boards JOIN pins ON (boards.id=board_id) ')
//     .then(boards => {
//         res.status(200).json({
//             status: 'success',
//             boards: boards,
//             message: 'all boards'
//         })
//     })
//     .catch((err) => {
//         next(err)
//     })
// }

const getAllBoards = (req, res, next) => {
    db.any('SELECT * FROM boards')
    .then(boards => {
        res.status(200).json({
            status: 'success',
            boards: boards,
            message: 'all boards'
        })
    })
    .catch((err) => {
        next(err)
    })
}

const getSingleBoard = (req, res, next) => {
    let boardId = parseInt(req.params.id)
    db.one('SELECT * FROM boards WHERE id=$1', [boardId])
    .then(board => {
        res.status(200).json({
            status: 'success',
            board: board,
            message: 'single board'
        })
    })
    .catch(err => {
        next(err)
    })
}

const editBoard = (req, res, next) => {
    db.none('UPDATE boards SET user_id = ${user_id}, title = ${title} WHERE id = ${id}', {
        id: parseInt(req.params.id),
        user_id: req.body.user_id,
        title: req.body.title
    })
    .then(() => {
        res.status(200)
        .json({
            status: "success",
            message: "updated board"
        })
    })
    .catch((err) => {
        return next(err)
    })
}

const addBoard = (req, res, next) => {
    db.none('INSERT INTO boards (use_id, title) VALUES (${use_id}, ${title})', req.body)
    .then(() => {
        res.status(200).json({
            status: 'success',
            message: 'added a board'
        })
    })
    .catch(err => {
        next(err)
    })
}

const deleteBoard = (req, res, next) => {
    let boardId = parseInt(req.params.id)
    db.none('DELETE FROM boards WHERE id=$1', boardId)
    .then(() => {
        res.status(200).json({
            status: success,
            message: 'you have deleted a board'
        })
    })
    .catch((err) => {
        next(err)
    })
}

module.exports = {getAllBoardsWithPinsCurrentUser, getAllBoards, getSingleBoard, editBoard, addBoard, deleteBoard}