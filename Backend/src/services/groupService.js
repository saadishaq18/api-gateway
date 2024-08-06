const Group = require('@models/Group')
const generateError = require('@utils/errorHandler')


const createGroup = async function (groupData) {
    try {
       
        const { group_name } = groupData
        
        const existingGroup = await Group.findOne({
            group_name: group_name,
            deletedAt: null
        })
        if (existingGroup) {
            
            throw generateError('Group already exists', 400)
        }

        const newGroup = new Group ({
            ...groupData
        })

        await newGroup.save()
        return {
            message: "Group created successfully",
            permissions: newGroup
        }
    } catch (error) {
        throw error
    }
}

const getAllGroups = async function () {
    try {
        const groups = await Group.find({ deletedAt: null })
        // console.log(groups)
        return groups
    } catch (error) {
        throw error
    }
}

const getGroupById = async function (groupId) {
    try {
        const group = await Group.find({
            _id: groupId,
            deletedAt: null

        })
        if (!group) {
            throw generateError('Group not found', 404)
        }
        return group
    } catch (error) {
        throw error
    }
}

const updateGroup = async function (groupId, groupData) {
    try {
        const group = await Group.findOneAndUpdate({
            _id: groupId,
            deletedAt: null
        }, {
            $set: groupData
        }, {
            new: true,
            runValidators: true
        }
        )
        if (!group) {
            throw generateError('Group not found', 404)
        }
        return group
    } catch (error) {
        throw error
    }
}

const deleteGroup = async function (groupId) {
    try {
        const group = await Group.findOne({
            _id: groupId,
            deletedAt: null
        })
        if (!group) {
            throw generateError('Group not found', 404)
        }
        group.softDelete()
        return {
            message: "Group deleted successfully"
        }
    } catch (error) {
        throw error
    }
}

const assignRolesToGroups = async (groupId, roleIds) => {
    try{
        const group = await Group.findById(groupId)
        if(!group) throw generateError('Group not found', 400)
        group.roles = roleIds

        return await group.save()

    }catch(e){
        throw error
    }

}

module.exports = {
    createGroup,
    getAllGroups,
    getGroupById,
    updateGroup,
    deleteGroup,
    assignRolesToGroups
}