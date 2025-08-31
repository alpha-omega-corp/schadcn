export const can = {
    mounted(el: any, binding: any) {
        console.log(binding);

        const permString = sessionStorage.getItem('permissions')
        if (permString) {
            const permissions = JSON.parse(permString)
            if (!permissions[binding.value]) {
                el.style.display = 'none'
            }
        }
    },
}
