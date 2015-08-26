var mongoose = require('mongoose');

var courseSchema = mongoose.Schema({
    name: String,
    featured: Boolean,
    published: Date,
    tags: [String]
});

var Course = mongoose.model('Course', courseSchema);

module.exports.seedInitialCourses = function() {
    Course.find({}).exec(function(err, collection) {
        if (err) {
            console.log('Cannot find courses: ' + err);
            return;
        }
        if (collection.length == 0) {
            Course.create({ name: 'C# for Sociopaths', featured: true, published: new Date('10/5/2013'), tags: ['C#']});
            Course.create({ name: 'C# for Non-Sociopaths', featured: true, published: new Date('10/12/2013'), tags: ['C#']});
            Course.create({ name: 'Super Duper Expert C#', featured: false, published: new Date('10/1/2013'), tags: ['C#']});
            Course.create({ name: 'Visual Basic for Visual Basic Developers', featured: false, published: new Date('7/12/2013'), tags: ['Visual Basic']});
            Course.create({ name: 'Pedantic C++', featured: true, published: new Date('1/1/2013'), tags: ['C++']});
            Course.create({ name: 'JavaScript for People over 20', featured: true, published: new Date('10/13/2013'), tags: ['JavaScript']});
            Course.create({ name: 'Maintainable code for Cowards', featured: true, published: new Date('3/1/2013'), tags: ['Coding']});
            Course.create({ name: 'A Survival Guide to Code Reviews', featured: true, published: new Date('2/1/2013'), tags: ['Coding']});
            Course.create({ name: 'How to Job Hunt Without Alerting your Boss', featured: true, published: new Date('10/7/2013'), tags: ['Job']});
            Course.create({ name: 'How to Keep your Soul and go into Management', featured: false, published: new Date('8/1/2013'), tags: ['Management']});
            Course.create({ name: 'Telling Recruiters to Leave You Alone', featured: false, published: new Date('11/1/2013'), tags: ['Job']});
            Course.create({ name: 'Writing Code that Doesn\'t Suck', featured: true, published: new Date('10/13/2013'), tags: ['Coding']});
            Course.create({ name: 'Code Reviews for Jerks', featured: false, published: new Date('10/1/2013'), tags: ['Coding']});
            Course.create({ name: 'How to Deal with Narcissistic Coworkers', featured: true, published: new Date('2/15/2013'), tags: ['Job']});
            Course.create({ name: 'Death March Coding for Fun and Profit', featured: true, published: new Date('7/1/2013'), tags: ['Coding']});

            console.log('Courses added to database....');
        }
    });
};
