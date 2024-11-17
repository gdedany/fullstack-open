mongoose = require('mongoose')
db_pass = process.argv[2]

db_url = `mongodb+srv://gdedanya:${db_pass}@cluster0.1bwld.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)
mongoose.connect(db_url)


if (!db_pass) {
    console.log('pass is required')
}

const personSchema = new mongoose.Schema({
    id: String,
    name: String,
    number: String,
})
const Person = mongoose.model('Person', personSchema)

const name = process.argv[3]
const number =process.argv[4]

if (name && number) {
    const person = new Person({
        id: Math.floor(Math.random() * 9999),
        name,
        number
    })
    person.save().then(p=>{console.log(`added ${p.name} number ${p.number} to phonebook`)
    mongoose.connection.close()
})} else {
    console.log('phonebook:')
    Person.find({}).then(result => {
        result.forEach(p => console.log(p.name + ' ' + p.number))
        mongoose.connection.close()

    })

    
}
