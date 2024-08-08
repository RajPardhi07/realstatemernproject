import listingModel from "../model/listingModel.js";


export const createListing = async (req, res) => {
try {
    const data = req.body;

    const createList = new listingModel(data)
    await createList.save();
    res.status(201).send({
        success:true,
        message:"List Create successfully",
        createList
    })
} catch (error) {
    console.log(error)
    res.status(500).send("Internal server error")
}
}

export const deleteListing = async (req, res) => {

    const listing = await listingModel.findById(req.params.id)

    if(!listing){
        return res.status(404).send("Listing not found")
    }
    try {
         await listingModel.findByIdAndDelete(req.params.id);
         res.status(200).json({
            success:true,
            message:"Listing deleted successfully"
         })
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal server error")
    
    }
}

export const updateListing = async (req, res) => {
    try {
        const listing = await listingModel.findById(req.params.id)

        if(!listing){
            return res.status(404).send("Listing not found")
        }

        const updatedListing = await listingModel.findByIdAndUpdate(req.params.id,
             req.body, {new:true});
        res.status(200).json(updatedListing);
    } catch (error) {
        console.log(error)
    }
}

export const getListing = async (req, res) => {
    try {
        const listing = await listingModel.findById(req.params.id);
        if(!listing){
            return res.status(404).send("Listing not found")
        }
        res.status(200).json({
            success:true,
            message:"geting all listing",
            listing
        })
    } catch (error) {
        console.log(error)
    }
}