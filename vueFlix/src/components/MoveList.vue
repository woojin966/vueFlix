<template>
    <ul>
        <li v-for="movie in filterMovies" :key="movie.title">
            {{ movie.title }}
        </li>
    </ul>
</template>

<script setup>
    import { ref, computed } from 'vue'
    import Hangul from 'hangul-js'
    
    const props = defineProps(['keyword'])

    const movies = [
        { title: '인셉션' },
        { title: '인터스텔라' },
        { title: '다크나이트' },
        { title: '아이언맨' },
        { title: 'Superman' },
        { title: 'Anne with an E' },
        { title: 'Gossip girl' },
        { title: 'Life is go on with tanserine' },
    ]

    const filterMovies = computed(() => {
        return movies.filter((movie) => {
            const title = movie.title
            const dis = Hangul.disassemble(title).join('')
            const search = Hangul.disassemble(props.keyword).join('')
    
            // 일반 검색도 병행
            return (
                title.toLowerCase().includes(props.keyword.toLowerCase()) ||
                dis.includes(search)
            )
        })
    })
</script>