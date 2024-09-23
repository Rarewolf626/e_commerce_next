import Image from "next/image";

const MasonryImage = () => {
  const images = [
    {
      src: "https://images.pexels.com/photos/1290515/pexels-photo-1290515.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      aspect: "aspect-[2/2]",
      alt: "Beautiful Landscape",
      name: "Mobile",
    },
    {
      src: "https://images.unsplash.com/photo-1484788984921-03950022c9ef?q=80&w=1532&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      aspect: "aspect-[3/2]",
      alt: "Urban Cityscape",
      name: "Laptop",
    },
    {
      src: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      aspect: "aspect-[3/2]",
      alt: "Forest Trail",
      name: "Watch",
    },
    {
      src: "https://images.unsplash.com/photo-1495121553079-4c61bcce1894?q=80&w=1581&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      aspect: "aspect-[2/2]",
      alt: "Mountain Peak",
      name: "Camera",
    },
    {
      src: "https://images.unsplash.com/photo-1609895314390-cb64c186466a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      aspect: "aspect-[2/2]",
      alt: "Desert Sunset",
      name: "Tablet",
    },
    {
      src: "https://images.unsplash.com/photo-1504890001746-a9a68eda46e2?q=80&w=1387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      aspect: "aspect-[3/2]",
      alt: "Coastal Waves",
      name: "Drone",
    },
    {
      src: "https://images.unsplash.com/photo-1532778597765-a2a1c4dda1ec?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      aspect: "aspect-[3/2]",
      alt: "Snowy Forest",
      name: "Headphone",
    },
    {
      src: "https://images.unsplash.com/photo-1567690187548-f07b1d7bf5a9?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      aspect: "aspect-[2/2]",
      alt: "Serene Lake",
      name: "Smart TV",
    },
  ];

  const imageGroups = [];
  for (let i = 0; i < images.length; i += 2) {
    imageGroups.push(images.slice(i, i + 2));
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 mb-12 container px-4 mx-auto">
      {imageGroups.map((group, index) => (
        <div className="grid gap-4 " key={index}>
          {group.map((image, idx) => (
            <div className={`${image.aspect} relative group   `} key={idx}>
              <Image
                width={500}
                height={500}
                className="h-full w-full object-cover rounded-lg"
                src={image.src}
                alt={image.alt}
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                <span className="text-white text-lg font-bold">
                  {image.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MasonryImage;
