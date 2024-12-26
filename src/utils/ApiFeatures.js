class ApiFeatures{
    constructor(mongooseQuery,data){
        this.mongooseQuery=mongooseQuery
        this.data=data
    }
    pagination(){
let{limit,page}=this.data
// let page=this.data.page||1
if(!limit||limit<=0){
    limit=10
}
if(!page||page<=0){
    page=1
}
const skip=(page-1)*limit
this.mongooseQuery.limit(Number(limit)).skip(Number(skip))
return this
} 
    sort(){
if(this.data.sort){
        this.mongooseQuery.sort(this.data.sort.replaceAll(',',' '))
        // return this
    }
    return this
}
    fields(){
if(this.data.fields){
        this.mongooseQuery.select(this.data.fields.replaceAll(',',' '))
        return this
    }
    return this
}
    search(){
if(this.data.search){
this.mongooseQuery.find({
    $or:[
        {title:{ $regex:this.data.search}},
        {describtion:{ $regex:this.data.search}}
    ]})
    return this
    }
    return this
}
    filter(){
    let filterObj=structuredClone(this.data)
        filterObj=JSON.stringify(filterObj)
        filterObj=filterObj.replace(/(gt|gte|lt|lte)/g,value => `$${value}`)
        filterObj=JSON.parse(filterObj)
        let exculudedFields=['page','sort','fields','search']
        exculudedFields.forEach(val=>{
            delete filterObj[val]
        })
        this.mongooseQuery.find(filterObj)
        return this
    }
}

export default ApiFeatures