<template>
    <div class="w-screen sm:h-half h-auto flex sm:flex-row flex-col-reverse bg-blue-300 relative">
        <span 
            @click="scrollToTop()"
            class="w-12 h-12 absolute -top-6 sm:right-12 right-6 bg-blue-600 cursor-pointer
                text-white flex justify-center items-center rounded-full"
        >
            <i class="material-icons">keyboard_double_arrow_up</i>
        </span>

        <!-- Footer SVG Section -->
        <div class="w-full sm:w-2/6 h-full flex justify-end items-center">
            <img src="@/assets/footer.svg" class="w-auto h-3/4" alt="">
        </div>
        
        <div class="w-full sm:w-4/6 h-full flex justify-around items-center flex-wrap">
            
            <!-- Short Contact About Us -->
            <div class="w-5/6 sm:w-60 h-44 mb-3 sm:mb-0 mt-12 sm:mt-0">
                <h2 class="font-bold text-2xl text-blue-800 mb-2">Our Vue Shop</h2>
                <p class="text-base sm:text-sm font-normal text-slate-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Ratione minus, obcaecati eveniet recusandae quo voluptatum 
                    voluptatibus atque illum, et molestiae, minima sed tenetur ipsam magnam.
                </p>
            </div>
            
            <!-- Contact Infos -->
            <div class="w-5/6 sm:w-60 h-44 my-3 sm:my-0">
                <h2 class="font-bold text-2xl text-blue-800 mb-2">Contact Infos</h2>
                <ul class="list-disc ps-5">
                    <li class="text-base sm:text-sm font-normal text-slate-500 mb-3">
                        vueshop@gmail.com
                    </li>
                    <li class="text-base sm:text-sm font-normal text-slate-500 mb-3">
                        09333444555, 09111222333
                    </li>
                    <li class="text-base sm:text-sm font-normal text-slate-500 mb-3">
                        No-1/A, Laeyer(4) Street, Thaketa Township, Yangon
                    </li>
                </ul>
            </div>
            
            <!-- Footer Navigations -->
            <div class="w-5/6 sm:w-60 h-44 my-3 sm:my-0">
                <h2 class="font-bold text-2xl text-blue-800 mb-2">Navigations</h2>
                <ul class="ps-2">
                    <li 
                        @click="$router.push({ path: '/'})" 
                        class="mb-2 text-md font-normal text-slate-500 cursor-pointer"
                    >
                        Home
                    </li>
                    <li 
                        @click="$router.push({ path: '/about'})" 
                        class="mb-2 text-md font-normal text-slate-500 cursor-pointer"
                    >
                        About
                    </li>
                    <li 
                        @click="$router.push({ path: '/shop'})" 
                        class="mb-2 text-md font-normal text-slate-500 cursor-pointer"
                    >
                        Shop
                    </li>
                    <li 
                        @click="$router.push({ path: '/contact'})" 
                        class="mb-2 text-md font-normal text-slate-500 cursor-pointer"
                    >
                        Contact us
                    </li>
                </ul>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

</script>