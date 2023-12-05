<template>
  <div class="p-4 bg-white rounded-lg shadow md:px-6 md:py-8 dark:bg-gray-900">
    <div class="sm:flex sm:items-center sm:justify-between">
      <span class="flex items-center mb-4 sm:mb-0">
        <img src="/img/logo.svg" class="mr-3 h-8" alt="Nofie Logo" />
      </span>
      <ul
        class="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400"
      >
        <li>
          <RouterLink to="/privacy-policy" class="mr-4 hover:underline md:mr-6"
            >Privacy Policy</RouterLink
          >
        </li>
        <li>
          <RouterLink to="/cookies-policy" class="mr-4 hover:underline md:mr-6"
            >Cookies Policy</RouterLink
          >
        </li>
      </ul>
    </div>
    <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
    <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400"
      >© 2022 <span class="hover:underline">Nofie™</span>. All Rights Reserved.
    </span>
  </div>
</template>
