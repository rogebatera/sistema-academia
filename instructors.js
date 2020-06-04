const fs = require('fs')
const data = require('./data.json')

// create
exports.post = function(req, res){
    const keys = Object.keys(req.body)

    for(key of keys){
        if(req.body[key] == ""){
            return res.send('Por Favor, Preencher todos os Campos.')
        }
    }

    let {avatar_url, birth, name, services, gender} = req.body

    birth = Date.parse(birth)
    const created_at = Date.now()
    const id = Number(data.instructors.length + 1)

    data.instructors.push({
      id,
      avatar_url,
      name,
      birth,
      gender,
      services,
      created_at,
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Write filer error!!")

        return res.redirect("/instructors")
    })
    
    //return res.send(req.body)
}

// mostrar

exports.show = function(req, res){
    const { id } = req.params
    
    const foundInstructor = data.instructors.find(function(instructor){
        return instructor.id == id
    })

    if(!foundInstructor) return res.send("Instructor Not Found!")

    const instructor = {
        ...foundInstructor,
        age: "", 
        services: foundInstructor.services.split(","),
        created_at: "",    
    }

    return res.render("instructors/show", {instructor: instructor})
}