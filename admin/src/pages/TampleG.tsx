import ImageGrid from "../components/images/ImageGrid"

export default function TampleG() {
    return (

        <div className="space-y-6">

            <div className="bg-[#1e2746] rounded-xl p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div>
                        <h1 className="text-xl font-semibold text-white">Images Management</h1>
                        <p className="text-gray-400 text-sm mt-1">Track and manage student fees</p>
                    </div>
                </div>
                <ImageGrid />
            </div>
        </div>

    )
}
