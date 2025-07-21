"use client"

import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, TrendingUp, TrendingDown, Activity, Globe } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const searchParams = useSearchParams()
  const url = searchParams.get("url") || ""

  // 모의 대시보드 데이터
  const dashboardData = {
    totalTests: 24,
    successRate: 87.5,
    avgResponseTime: 312,
    uptime: 99.2,
    lastTest: new Date().toLocaleString(),
    trends: {
      responseTime: "+12%",
      successRate: "-2.1%",
      uptime: "+0.3%",
    },
  }

  const recentTests = [
    { time: "14:30", status: "success", responseTime: 245 },
    { time: "14:25", status: "success", responseTime: 189 },
    { time: "14:20", status: "fail", responseTime: 5000 },
    { time: "14:15", status: "success", responseTime: 312 },
    { time: "14:10", status: "success", responseTime: 278 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-6 pt-8">
          <Link href={`/test-results?url=${encodeURIComponent(url)}`}>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              테스트 결과로 돌아가기
            </Button>
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">테스트 대시보드</h1>
          <p className="text-lg text-gray-600 flex items-center justify-center">
            <Globe className="w-4 h-4 mr-2" />
            {url}
          </p>
        </div>

        {/* 주요 메트릭 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">총 테스트 수</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.totalTests}</div>
              <p className="text-xs text-gray-500 mt-1">지난 24시간</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">성공률</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{dashboardData.successRate}%</div>
              <div className="flex items-center mt-1">
                <TrendingDown className="w-3 h-3 text-red-500 mr-1" />
                <span className="text-xs text-red-500">{dashboardData.trends.successRate}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">평균 응답시간</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{dashboardData.avgResponseTime}ms</div>
              <div className="flex items-center mt-1">
                <TrendingUp className="w-3 h-3 text-red-500 mr-1" />
                <span className="text-xs text-red-500">{dashboardData.trends.responseTime}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">가동률</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{dashboardData.uptime}%</div>
              <div className="flex items-center mt-1">
                <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                <span className="text-xs text-green-500">{dashboardData.trends.uptime}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* 최근 테스트 활동 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                최근 테스트 활동
              </CardTitle>
              <CardDescription>최근 5개 테스트 결과</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentTests.map((test, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Badge variant={test.status === "success" ? "default" : "destructive"}>
                        {test.status === "success" ? "성공" : "실패"}
                      </Badge>
                      <span className="text-sm font-mono">{test.time}</span>
                    </div>
                    <span
                      className={`text-sm font-medium ${test.responseTime > 1000 ? "text-red-600" : "text-green-600"}`}
                    >
                      {test.responseTime}ms
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 시스템 상태 */}
          <Card>
            <CardHeader>
              <CardTitle>시스템 상태</CardTitle>
              <CardDescription>현재 시스템 상태 및 정보</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">마지막 테스트</span>
                <span className="text-sm font-medium">{dashboardData.lastTest}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">테스트 상태</span>
                <Badge variant="default">활성</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">모니터링</span>
                <Badge variant="default">실행 중</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">알림</span>
                <Badge variant="secondary">설정됨</Badge>
              </div>

              <div className="pt-4 border-t">
                <Button className="w-full bg-transparent" variant="outline">
                  새 테스트 실행
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>대시보드는 실시간으로 업데이트됩니다. 마지막 업데이트: {new Date().toLocaleString()}</p>
        </div>
      </div>
    </div>
  )
}
