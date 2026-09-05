document.addEventListener('DOMContentLoaded', () => {
    // 1. Tương tác 3D cho Panel (Mượt hơn)
    const panels = document.querySelectorAll('.glass-panel');

    panels.forEach(panel => {
        panel.addEventListener('mousemove', (e) => {
            const rect = panel.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;  
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const tiltX = ((y - centerY) / centerY) * -3; // Giảm độ nghiêng để mượt mà hơn
            const tiltY = ((x - centerX) / centerX) * 3;
            
            // Thêm ánh sáng bóng bẩy (Glare effect) theo hướng chuột
            panel.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-8px) scale(1.02)`;
        });

        panel.addEventListener('mouseleave', () => {
            panel.style.transform = `perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)`;
        });
    });
    
    // 2. Parallax effect cho các hình nền trôi nổi
    const shapes = document.querySelectorAll('.shape');
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 30;
            const x = mouseX * speed;
            const y = mouseY * speed;
            // Kế thừa animation float của CSS, chỉ dịch chuyển vị trí gốc
            shape.style.marginLeft = `${x}px`;
            shape.style.marginTop = `${y}px`;
        });
    });

    // 3. Hiệu ứng cuộn trang (Scroll Animation) - Càng cuộn càng hiện ra
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Tạo độ trễ xếp tầng để các thẻ hiện ra lần lượt đẹp mắt
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 150); 
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.slide-up').forEach((el) => {
        observer.observe(el);
    });

    // 4. Tạo hạt bay lơ lửng (Particles Effect) tạo sự sống động
    const body = document.body;
    const colors = ['#FF3366', '#00C9FF', '#FFD700', '#ffffff'];
    
    for (let i = 0; i < 25; i++) {
        let particle = document.createElement('div');
        particle.classList.add('particle');
        
        let size = Math.random() * 8 + 4; // Kích thước hạt từ 4px - 12px
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Vị trí ngẫu nhiên
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        
        // Màu ngẫu nhiên
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        // Thời gian bay và delay ngẫu nhiên
        particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        body.appendChild(particle);
    }
});
