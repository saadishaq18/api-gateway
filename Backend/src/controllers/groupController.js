const {createGroup, getAllGroups, getGroupById, updateGroup, deleteGroup,assignRolesToGroups} = require('@services/groupService')

const addGroup = async (req, res, next) => {
    try {
        const response = await createGroup(req.body)
        res.status(201).json(response)
    } catch (error) {
        next(error)
    }
}

const getGroupsAll = async (req, res,next) =>{
    try {
        const response = await getAllGroups()
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

const getGroup = async (req, res, next) =>{
    try {
        const response = await getGroupById(req.params.id)
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

const GroupUpdate = async (req, res, next) => {
    try {
        const response = await updateGroup(req.params.id, req.body)
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

const removeGroup = async (req, res, next) => {
    try {
        const response = await deleteGroup(req.params.id)
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

const assignRolesToGroup = async (req, res, next) => {
    try{
        const {groupId, roleIds} = req.body
        const response = await assignRolesToGroups(groupId, roleIds)
        res.status(200).json(response)
    }
    catch(e){
        next(error)
    }
}

module.exports = {
    addGroup,
    getGroupsAll,
    getGroup,
    GroupUpdate,
    removeGroup,
    assignRolesToGroup
}