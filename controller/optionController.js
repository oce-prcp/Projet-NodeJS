const Option = require('../models/optionModel')

exports.create= async(req, res)=>{
    let option = req.body
    let result = await Option.create(option)
    result.save()
    res.status(201).json(result)
}

exports.update = async(req, res)=>{
    let id = parseInt(req.params.id)
    let updateOption = req.body
    
    let option = await Option.update(updateOption,{
        where: {
            id: id
        }
    })
    res.status(200).json(option)
}

exports.getAll= async(req, res)=>{
    const option = await Option.findAll()
    res.status(200).json(option)
}

exports.optionId= async(req, res)=>{
    const option = await Option.findByPk(parseInt(req.params.id))
    res.status(200).json(option)
}

exports.delete = async (req, res) => {
    const optionId = parseInt(req.params.id);

    try {
        const option = await Option.findByPk(optionId);

        if (!option) {
            return res.status(404).json({ message: 'Option non trouvée' });
        }

        await option.destroy();

        res.status(200).json({ message: 'Option supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
