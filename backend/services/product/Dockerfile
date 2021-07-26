FROM golang:1.16

WORKDIR /app

# Download Go modules
COPY go.mod .
COPY go.sum .
RUN go mod download

# Add wait-for-it
COPY wait-for-it.sh wait-for-it.sh
RUN chmod +x wait-for-it.sh

COPY *.go ./

RUN go build -o /productservice
ENV PORT=8000
EXPOSE 8000
CMD ["./wait-for-it.sh","localhost:5433", "-t", "5", "--", "/productservice"]