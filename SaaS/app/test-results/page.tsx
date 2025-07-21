"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, CheckCircle, XCircle, Clock, Camera, BarChart3 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface TestResult {
  id: string
  timestamp: string
  status: "success" | "fail"
  responseTime: number
  screenshot: string
  details: string
}

export default function TestResultsPage() {
  const searchParams = useSearchParams()
  const url = searchParams.get("url") || ""
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [testResults, setTestResults] = useState<TestResult[]>([])

  // 모의 테스트 실행
  useEffect(() => {
    const runTest = async () => {
      setIsLoading(true)

      // 진행률 시뮬레이션
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval)
            return 100
          }
          return prev + 10
        })
      }, 300)

      // 3초 후 테스트 완료
      setTimeout(() => {
        setIsLoading(false)

        // 모의 테스트 결과 생성
        const mockResults: TestResult[] = [
          {
            id: "1",
            timestamp: new Date().toLocaleString(),
            status: "success",
            responseTime: 245,
            screenshot: "/placeholder.svg?height=200&width=300",
            details: "페이지 로딩 성공",
          },
          {
            id: "2",
            timestamp: new Date(Date.now() - 30000).toLocaleString(),
            status: "success",
            responseTime: 189,
            screenshot: "/placeholder.svg?height=200&width=300",
            details: "API 응답 정상",
          },
          {
            id: "3",
            timestamp: new Date(Date.now() - 60000).toLocaleString(),
            status: "fail",
            responseTime: 5000,
            screenshot: "/placeholder.svg?height=200&width=300",
            details: "타임아웃 발생",
          },
          {
            id: "4",
            timestamp: new Date(Date.now() - 90000).toLocaleString(),
            status: "success",
            responseTime: 312,
            screenshot: "/placeholder.svg?height=200&width=300",
            details: "모든 요소 로딩 완료",
          },
        ]

        setTestResults(mockResults)
      }, 3000)
    }

    if (url) {
      runTest()
    }
  }, [url])

  const successCount = testResults.filter((r) => r.status === "success").length
  const failCount = testResults.filter((r) => r.status === "fail").length
  const avgResponseTime =
    testResults.length > 0
      ? Math.round(testResults.reduce((sum, r) => sum + r.responseTime, 0) / testResults.length)
      : 0

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-6 pt-8">
            <Link href="/web-test">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                돌아가기
              </Button>
            </Link>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">테스트 실행 중</h1>
            <p className="text-lg text-gray-600 mb-4">{url}</p>
            <Progress value={progress} className="w-full max-w-md mx-auto" />
            <p className="text-sm text-gray-500 mt-2">{progress}% 완료</p>
          </div>

          <Card>
            <CardContent className="p-8 text-center">
              <Clock className="w-16 h-16 mx-auto mb-4 text-blue-600 animate-spin" />
              <p className="text-lg">자동화 테스트를 실행하고 있습니다...</p>
              <p className="text-sm text-gray-500 mt-2">잠시만 기다려주세요.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6 pt-8">
          <Link href="/web-test">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              돌아가기
            </Button>
          </Link>
          <Link href={`/dashboard?url=${encodeURIComponent(url)}`}>
            <Button>
              <BarChart3 className="w-4 h-4 mr-2" />
              대시보드 보기
            </Button>
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">테스트 결과</h1>
          <p className="text-lg text-gray-600">{url}</p>
        </div>

        {/* 요약 통계 */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <p className="text-2xl font-bold text-green-600">{successCount}</p>
              <p className="text-sm text-gray-600">성공</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <XCircle className="w-8 h-8 mx-auto mb-2 text-red-600" />
              <p className="text-2xl font-bold text-red-600">{failCount}</p>
              <p className="text-sm text-gray-600">실패</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <p className="text-2xl font-bold text-blue-600">{avgResponseTime}ms</p>
              <p className="text-sm text-gray-600">평균 응답시간</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Camera className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <p className="text-2xl font-bold text-purple-600">{testResults.length}</p>
              <p className="text-sm text-gray-600">스크린샷</p>
            </CardContent>
          </Card>
        </div>

        {/* 스크린샷 테이블 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>스크린샷 및 테스트 결과</CardTitle>
            <CardDescription>시간순으로 정렬된 테스트 결과와 스크린샷</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>시간</TableHead>
                  <TableHead>상태</TableHead>
                  <TableHead>응답시간</TableHead>
                  <TableHead>스크린샷</TableHead>
                  <TableHead>상세정보</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {testResults.map((result) => (
                  <TableRow key={result.id}>
                    <TableCell className="font-mono text-sm">{result.timestamp}</TableCell>
                    <TableCell>
                      <Badge variant={result.status === "success" ? "default" : "destructive"}>
                        {result.status === "success" ? "성공" : "실패"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className={result.responseTime > 1000 ? "text-red-600" : "text-green-600"}>
                        {result.responseTime}ms
                      </span>
                    </TableCell>
                    <TableCell>
                      <Image
                        src={result.screenshot || "/placeholder.svg"}
                        alt="Screenshot"
                        width={100}
                        height={60}
                        className="rounded border"
                      />
                    </TableCell>
                    <TableCell>{result.details}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
