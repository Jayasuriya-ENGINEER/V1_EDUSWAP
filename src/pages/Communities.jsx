import { useState } from "react";
import { Search, Plus, Users, Lock, Globe } from "lucide-react";

export default function Communities() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Sample community data
  const communities = [
    {
      id: 1,
      name: "Web Development Masters",
      description: "Learn  web development from React to Node.js",
      members: 1234,
      isPrivate: false,
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop",
      category: "Tech"
    },
    {
      id: 2,
      name: "Digital Art Studio",
      description: "Share and learn digital art techniques and tools",
      members: 856,
      isPrivate: false,
      image: "https://images.unsplash.com/photo-1561998338-13ad7883b20f?w=400&h=300&fit=crop",
      category: "Art"
    },
    {
      id: 3,
      name: "Rural Entrepreneurs",
      description: "Empowering rural communities with business skills",
      members: 542,
      isPrivate: true,
      image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400&h=300&fit=crop",
      category: "Business"
    },
    {
      id: 4,
      name: "Language Exchange Hub",
      description: "Practice languages with native speakers worldwide",
      members: 2103,
      isPrivate: false,
      image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&h=300&fit=crop",
      category: "Languages"
    },
    {
      id: 5,
      name: "Music Production Lab",
      description: "Learn music production, mixing, and mastering",
      members: 967,
      isPrivate: false,
      image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=300&fit=crop",
      category: "Music"
    },
    {
      id: 6,
      name: "Startup Mentorship",
      description: "Connect with mentors to grow your startup",
      members: 445,
      isPrivate: true,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
      category: "Business"
    }
  ];

  const filteredCommunities = communities.filter(community =>
    community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    community.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    community.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateCommunity = () => {
    // Handle community creation logic here
    setShowCreateModal(false);
  };

  return (
    <div className="min-h-screen bg-zinc-100 text-white">
      {/* Header */}
      <div className=" bg-zinc-100">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold mb-2 text-black">Communities</h1>
          <p className="text-black/70">Discover and join learning communities</p>
        </div>
      </div>


      {/* Search and Create Button */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-2xl w-full">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search communities by name, description, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-orange-500/30 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 text-black placeholder-gray-400 transition-all"
            />
          </div>

          {/* Create Community Button */}
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold flex items-center gap-2 transition-colors shadow-lg hover:shadow-orange-500/50"
          >
            <Plus className="w-5 h-5" />
            Create Community
          </button>
        </div>
      </div>

      {/* Communities Grid */}
       <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCommunities.map((community) => (
            <div
              key={community.id}
              className="backdrop-blur-xl bg-white/5 border border-transparent rounded-2xl overflow-hidden hover:border-orange-500 transition-all duration-300 cursor-pointer group shadow-none text-black"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden group">
                <img
                  src={community.image}
                  alt={community.name}
                  className="w-full h-full object-cover"
                />
                {/* Orange overlay on hover */}
                <div className="absolute inset-0 bg-orange-500/0 transition-all duration-300"></div>
                <div className="absolute top-3 right-3">
                  {community.isPrivate ? (
                    <div className="bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 text-sm text-white">
                      <Lock className="w-3 h-3" />
                      Private
                    </div>
                  ) : (
                    <div className="bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 text-sm text-white">
                      <Globe className="w-3 h-3" />
                      Public
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-5 text-black">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-semibold group-hover:text-orange-400 transition-colors">
                    {community.name}
                  </h3>
                </div>
                
                <p className="text-black text-sm mb-4 line-clamp-2">
                  {community.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-black/80 text-sm">
                    <Users className="w-4 h-4" />
                    <span>{community.members.toLocaleString()} members</span>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">
                    {community.category}
                  </span>
                </div>

                <button className="w-full mt-4 py-2 rounded-lg bg-white hover:bg-orange-500 border border-orange-500/30 hover:border-orange-500 text-orange-400 hover:text-white font-medium transition-all shadow-none">
                  Join Community
                </button>
              </div>
            </div>
          ))}
        </div>


        {filteredCommunities.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No communities found matching your search.</p>
          </div>
        )}
      </div>

      {/* Create Community Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-orange-500/30 rounded-2xl p-8 max-w-2xl w-full shadow-2xl">
            <h2 className="text-3xl font-bold mb-6 text-black">Create New Community</h2>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2 text-black">Community Name</label>
                <input
                  type="text"
                  placeholder="e.g., Web Development Masters"
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 text-black placeholder-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-black">Description</label>
                <textarea
                  placeholder="Describe what your community is about..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 text-black placeholder-gray-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-black">Category</label>
                <select className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 text-black">
                  <option value="">Select a category</option>
                  <option value="tech">Tech</option>
                  <option value="art">Art</option>
                  <option value="business">Business</option>
                  <option value="languages">Languages</option>
                  <option value="music">Music</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-black">Privacy</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer text-black">
                    <input type="radio" name="privacy" value="public" defaultChecked className="text-orange-500" />
                    <span>Public</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-black">
                    <input type="radio" name="privacy" value="private" className="text-orange-500" />
                    <span>Private</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-orange-500/30 text-black transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateCommunity}
                  className="flex-1 px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-colors"
                >
                  Create Community
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}