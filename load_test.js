import http from 'k6/http';
import { check, sleep } from 'k6';

// 부하 테스트 옵션 설정
export let options = {
  stages: [
    { duration: '30s', target: 50 },  // 30초 동안 50명 사용자 추가
    { duration: '1m', target: 50 },   // 1분 동안 50명 사용자 유지
    { duration: '30s', target: 0 },   // 30초 동안 사용자 수 0명으로 감소
  ],
};

export default function () {
  // JSONPlaceholder API의 특정 엔드포인트에 GET 요청
  let res = http.get('https://jsonplaceholder.typicode.com/posts');

  // 응답 검증
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time is below 500ms': (r) => r.timings.duration < 500,
  });

  sleep(1);  // 각 가상 사용자가 1초 대기 후 요청을 반복
}
