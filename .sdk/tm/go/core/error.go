package core

type UToLinkShortenerError struct {
	IsUToLinkShortenerError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewUToLinkShortenerError(code string, msg string, ctx *Context) *UToLinkShortenerError {
	return &UToLinkShortenerError{
		IsUToLinkShortenerError: true,
		Sdk:              "UToLinkShortener",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *UToLinkShortenerError) Error() string {
	return e.Msg
}
