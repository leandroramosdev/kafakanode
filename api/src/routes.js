import express from 'express'

const routes = express.Router()

routes.post('/certifications', async (req, res) => {
    //Chamar micro servico 
    await req.producer.send({
        topic: 'issue-certificate',
        messages: [
            {
                value: JSON.stringify({
                    'id': 1,
                    'name': 'Leandro Ramos',
                    'github': 'leandroramosdev'
                })
            },
        ],
    })
    return res.json({ "msg": "The message has been sended!" })
})

export default routes;