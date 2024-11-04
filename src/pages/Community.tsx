import React, { useState, useRef } from 'react';
import { MessageSquare, ThumbsUp, Share2, Send, Image, Video, X } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

interface Media {
  type: 'image' | 'video';
  url: string;
}

interface Post {
  id: string;
  userId: string;
  userName: string;
  content: string;
  media?: Media[];
  likes: number;
  comments: number;
  timestamp: Date;
  userAvatar: string;
}

export default function Community() {
  const user = useAuthStore(state => state.user);
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      userId: '1',
      userName: 'Sarah Wilson',
      content: 'Just completed my first 5K run! Thanks to everyone in the community for the motivation and support. 🏃‍♀️',
      media: [{
        type: 'image',
        url: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
      }],
      likes: 24,
      comments: 12,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
      id: '2',
      userId: '2',
      userName: 'Michael Brown',
      content: 'Looking for workout buddies in the Seattle area! Anyone interested in meeting up for morning runs? 🌄',
      media: [{
        type: 'video',
        url: 'https://player.vimeo.com/video/517090666'
      }],
      likes: 18,
      comments: 8,
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    }
  ]);
  const [newPost, setNewPost] = useState('');
  const [mediaFiles, setMediaFiles] = useState<Media[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCreatePost = () => {
    if (!newPost.trim() && mediaFiles.length === 0) return;

    const post: Post = {
      id: Date.now().toString(),
      userId: user?.id.toString() || '',
      userName: user?.name || '',
      content: newPost,
      media: mediaFiles,
      likes: 0,
      comments: 0,
      timestamp: new Date(),
      userAvatar: `https://ui-avatars.com/api/?name=${user?.name}&background=0D9488&color=fff`
    };

    setPosts([post, ...posts]);
    setNewPost('');
    setMediaFiles([]);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const url = e.target?.result as string;
        const type = file.type.startsWith('image/') ? 'image' : 'video';
        setMediaFiles(prev => [...prev, { type, url }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeMedia = (index: number) => {
    setMediaFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Community</h1>
      </div>

      {/* Create Post */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-start space-x-4">
          <img
            className="h-10 w-10 rounded-full"
            src={`https://ui-avatars.com/api/?name=${user?.name}&background=0D9488&color=fff`}
            alt={user?.name}
          />
          <div className="flex-1">
            <textarea
              rows={3}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              placeholder="Share your fitness journey..."
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
            />
            
            {/* Media Preview */}
            {mediaFiles.length > 0 && (
              <div className="mt-3 grid grid-cols-2 gap-2">
                {mediaFiles.map((media, index) => (
                  <div key={index} className="relative">
                    {media.type === 'image' ? (
                      <img
                        src={media.url}
                        alt="Preview"
                        className="rounded-lg object-cover h-40 w-full"
                      />
                    ) : (
                      <video
                        src={media.url}
                        className="rounded-lg object-cover h-40 w-full"
                        controls
                      />
                    )}
                    <button
                      onClick={() => removeMedia(index)}
                      className="absolute top-2 right-2 p-1 bg-gray-900 bg-opacity-50 rounded-full text-white hover:bg-opacity-75"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-3 flex items-center justify-between">
              <div className="flex space-x-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept="image/*,video/*"
                  className="hidden"
                  multiple
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <Image className="h-4 w-4 mr-2" />
                  Photo
                </button>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <Video className="h-4 w-4 mr-2" />
                  Video
                </button>
              </div>
              <button
                onClick={handleCreatePost}
                disabled={!newPost.trim() && mediaFiles.length === 0}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4 mr-2" />
                Post
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <img
                className="h-10 w-10 rounded-full"
                src={post.userAvatar}
                alt={post.userName}
              />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{post.userName}</p>
                <p className="text-sm text-gray-500">
                  {new Date(post.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
            <p className="text-gray-900 mb-4">{post.content}</p>
            
            {/* Post Media */}
            {post.media && post.media.length > 0 && (
              <div className="mb-4 grid grid-cols-2 gap-2">
                {post.media.map((media, index) => (
                  <div key={index} className="relative rounded-lg overflow-hidden">
                    {media.type === 'image' ? (
                      <img
                        src={media.url}
                        alt="Post media"
                        className="object-cover w-full h-64"
                      />
                    ) : (
                      <iframe
                        src={media.url}
                        className="w-full h-64"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex space-x-4">
                <button 
                  onClick={() => handleLike(post.id)}
                  className="flex items-center text-gray-500 hover:text-green-600"
                >
                  <ThumbsUp className="h-5 w-5 mr-1" />
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center text-gray-500 hover:text-green-600">
                  <MessageSquare className="h-5 w-5 mr-1" />
                  <span>{post.comments}</span>
                </button>
                <button className="flex items-center text-gray-500 hover:text-green-600">
                  <Share2 className="h-5 w-5 mr-1" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}